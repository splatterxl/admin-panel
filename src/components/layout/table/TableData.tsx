import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { FormEvent } from "react"
import { AiOutlineMinus } from "react-icons/ai"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { MdDone, MdEdit } from "react-icons/md"
import { themed } from "../../../util/constants"
import { toProperCase } from "../../../util/string"
import { GhostButtonProps } from "../../GhostButton"
import { Section } from "../section/Section"
import { TableRow } from "./rows/TableRow"
import { TableRows } from "./rows/TableRows"

export type NotNull<T> = Exclude<T, null | undefined>

export class TableData extends React.Component<
  {
    data: Record<string, React.ReactNode> | React.ReactNode[]
    editable?: boolean
    transformEdit?: Record<
      string,
      () =>
        | string
        | number
        | null
        | undefined
        | { value: string; label: string }
    >
    onEdit?: (args: any) => void | Promise<void>
    onItemAdd?: () => void | Promise<void>
    onItemRemove?: (key: string) => void | Promise<void>
    title?: string
  },
  {
    editing: boolean
    submitting: boolean
    values: Record<string, string>
  }
> {
  state = {
    editing: false,
    submitting: false,
    values: {},
  }

  listener(event: KeyboardEvent) {
    if (
      (event.keyCode === 27 || event.key === "Escape") &&
      this.state.editing
    ) {
      this.setState((prev) => ({ ...prev, editing: false }))
    }
  }

  isArray() {
    return Array.isArray(this.props.data)
  }

  /**
   * Sanitise a value to an editable form field value that can be inserted into an input value
   *
   * We cannot add a ReactNode to the input value for obvious reasons
   */
  sanitiseValue(val: React.ReactNode) {
    if (["string", "number", "boolean"].includes(typeof val))
      return val?.toString()
    else return null
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    this.setEditing(true)
    this.setSubmitting(true)

    try {
      if (this.isArray()) {
        // create a new array to carry over set data that we don't need to change, but not to mutate the props array since that's kinda important to keep
        // as-is
        //
        // this is different from the object implementation where we only send the values
        // that have explicitly been changed by the end user, to be optimised and save bandwidth
        // in HTTP PATCH requests.
        //
        // for arrays, however, we need to include all of the values since it is not in fact a PATCH
        // request with an object.
        //
        // for example: take the following object value passed to this component
        //
        // data = { name: 'a', value: 'three' }
        //
        // if the user edits `value`, then we can just send back the `value` property with its new edited
        // value as the mutation by the parent component is probably just a PATCH request.
        //
        // however, take this following array:
        //
        // data = [1, 2, 3]
        //
        // we cannot send back just the edited value as every value _must_ be present in the array for Discord's API
        // to mutate properly (except for adding a single feature, which I'm pretty sure Patchcord does not implement, and also is an edge case).
        // that does not apply to the other endpoints so for consistency and to ensure no data is lost we send back the entire array.
        const array: any[] = Object.assign([], this.props.data)

        for (const [key, value] of Object.entries(this.state.values)) {
          array[+key] = value
        }

        // @ts-ignore
        this.props.onEdit!(array)
      } else {
        // simply pass the edited values to the handler.
        // @ts-ignore
        this.props.onEdit!(this.state.values)
      }
    } catch (e) {
      console.error(e)
    }

    this.setSubmitting(false)
    this.setEditing(false)
  }

  render() {
    return this.getView()
  }

  componentDidMount() {
    window.addEventListener("keydown", this.listener.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listener.bind(this))
  }

  getView() {
    if (this.state.editing) return this.getEditingView()
    else return this.getDisplayView()
  }

  setEditing(editing: boolean) {
    return this.setState((prev) => ({ ...prev, editing }))
  }

  setSubmitting(submitting: boolean) {
    return this.setState((prev) => ({ ...prev, submitting }))
  }

  getDisplayView() {
    const rows = <TableRows>{this.getDisplayRows()}</TableRows>

    if (this.props.editable)
      return (
        <Section
          heading={this.props.title!}
          actions={
            <IconButton
              size="xs"
              icon={
                this.state.submitting ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={MdEdit} boxSize="1.5em" />
                )
              }
              onClick={() => {
                this.setEditing(true)
              }}
              {...GhostButtonProps}
              aria-label="Edit"
            />
          }
        >
          {rows}
        </Section>
      )
    else return rows
  }

  getEditingView() {
    const rows = this.getEditingRows()

    return (
      <form style={{ width: "100%" }} onSubmit={this.handleSubmit.bind(this)}>
        <Section
          heading={this.props.title!}
          actions={
            <IconButton
              type={"submit"}
              size="xs"
              icon={
                this.state.submitting ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={MdDone} boxSize="1.5em" />
                )
              }
              {...GhostButtonProps}
              aria-label="Edit"
            />
          }
        >
          <TableRows>{rows}</TableRows>
        </Section>
      </form>
    )
  }

  getDisplayRows() {
    const rows = []

    for (let [key, value] of Object.entries(this.props.data)) {
      if (value === undefined) {
        value = (
          <Text as="span" mr={2.5} color="whiteAlpha.400">
            Unset
          </Text>
        )
      } else if (!value) {
        continue
      }

      rows.push(
        <TableRow
          title={!this.isArray() ? toProperCase(key) : undefined}
          key={key}
        >
          {value}
        </TableRow>
      )
    }

    return rows
  }

  getEditingRows() {
    const rows = []

    for (const [key, value] of Object.entries(this.props.data)) {
      const sanitised = this.sanitiseValue(value)

      let final: string | number | null | undefined = sanitised

      if (sanitised == null) {
        const transformed = this.props.transformEdit?.[key]?.()

        if (transformed != null) {
          if (typeof transformed === "object") {
            final = transformed.label
          } else {
            final = transformed
          }
        }
      }

      const isArray = this.isArray()

      rows.push(
        <TableRow
          title={!isArray ? toProperCase(key) : undefined}
          actions={
            isArray && this.props.onItemRemove ? (
              <IconButton
                aria-label="delete"
                size="xs"
                onClick={() => {
                  this.props.onItemRemove!(key)
                }}
                {...GhostButtonProps}
                icon={<Icon as={AiOutlineMinus} />}
              />
            ) : undefined
          }
          key={final === "" ? key : final}
          noText
        >
          <Input
            name={key}
            id={key}
            aria-label={key}
            size="xs"
            fontSize="sm"
            width="full"
            variant="flushed"
            rounded="sm"
            {...themed("bgColor", "secondary")}
            defaultValue={final ?? ""}
            onChange={(event) => {
              this.setState((prev) => ({
                ...prev,
                values: { ...prev.values, [key]: event.target.value },
              }))
            }}
            placeholder={this.isArray() ? "" : "Unset"}
          />
        </TableRow>
      )
    }

    if (this.isArray() && this.props.onItemAdd) {
      rows.push(
        <Button
          variant="ghost"
          width="full"
          size="sm"
          rounded={0}
          onClick={() => {
            this.props.onItemAdd!()
          }}
          {...themed("bgColor", "secondary")}
        >
          <HStack gap={1} opacity={0.8}>
            <Icon as={BsFillPlusCircleFill} {...themed("stroke", "text")} />
            <Text as="span">Add item</Text>
          </HStack>
        </Button>
      )
    }

    return rows
  }
}
