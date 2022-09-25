import { Icon, IconButton, Input, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import { MdDone, MdEdit } from "react-icons/md"
import { themed } from "../../../util/constants"
import { toProperCase } from "../../../util/string"
import { GhostButtonProps } from "../../GhostButton"
import { Section } from "../section/Section"
import { TableRow } from "./rows/TableRow"
import { TableRows } from "./rows/TableRows"

export type NotNull<T> = Exclude<T, null | undefined>

// TODO
export const TableData: React.FC<{
  data: Record<string, React.ReactNode>
  editable?: boolean
  transformEdit?: Record<
    string,
    () => string | number | null | undefined | { value: string; label: string }
  >
  onEdit?: (args: Record<string, string | number>) => void | Promise<void>
  title?: string
}> = ({
  data,
  editable = false,
  title,
  transformEdit: transformToEditableValues,
  onEdit,
}) => {
  const initialRows = []

  const [editing, setEditing] = React.useState(false),
    [submitting, setSubmitting] = React.useState(false),
    [values, setValues] = React.useState({})

  function sanitiseValue(val: React.ReactNode) {
    if (["string", "number", "boolean"].includes(typeof val))
      return val?.toString()
    else return null
  }

  for (let [key, value] of Object.entries(data)) {
    if (value === null) continue

    if (!editing) {
      if (value === undefined)
        value = (
          <Text as="span" mr={2.5} color="whiteAlpha.400">
            Unset
          </Text>
        )
      initialRows.push(
        <TableRow title={toProperCase(key)} key={key}>
          {value}
        </TableRow>
      )
    } else {
      const sanitised = sanitiseValue(value)

      let final: string | number | null | undefined = sanitised

      if (sanitised == null) {
        const transformed = transformToEditableValues?.[key]?.()

        if (transformed != null) {
          if (typeof transformed === "object") {
            final = transformed.label
          } else {
            final = transformed
          }
        }
      }

      initialRows.push(
        <TableRow title={toProperCase(key)} noText>
          <Input
            name={key}
            id={key}
            key={key}
            aria-label={key}
            size="xs"
            fontSize="sm"
            width="full"
            variant="flushed"
            rounded="sm"
            {...themed("bgColor", "secondary")}
            defaultValue={final ?? ""}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, [key]: event.target.value }))
            }}
            placeholder="Unset"
          />
        </TableRow>
      )
    }
  }

  {
    const listener = (event: KeyboardEvent) => {
      if ((event.keyCode === 27 || event.key === "Escape") && editing) {
        setEditing(false)
      }
    }

    React.useEffect(() => {
      if (editing) {
        window.addEventListener("keydown", listener)

        return () => window.removeEventListener("keydown", listener)
      } else {
        window.removeEventListener("keydown", listener)
      }
    }, [editing, listener])
  }

  if (!editable) return <TableRows>{initialRows}</TableRows>
  else
    return (
      <form
        style={{ width: "100%" }}
        onSubmit={async (event) => {
          event.preventDefault()

          setEditing(true)
          setSubmitting(true)

          await onEdit?.(values)

          setSubmitting(false)
          setEditing(false)
        }}
      >
        <Section
          heading={title!}
          actions={
            <IconButton
              type={editing ? "button" : "submit"}
              size="xs"
              icon={
                submitting ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={editing ? MdDone : MdEdit} boxSize="1.5em" />
                )
              }
              onClick={() => {
                if (submitting) return

                setEditing(!editing)
              }}
              {...GhostButtonProps}
              aria-label="Edit"
            />
          }
        >
          <TableRows>{initialRows}</TableRows>
        </Section>
      </form>
    )
}
