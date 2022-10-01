import React from 'react';
import FocusedUserStore from '../../../stores/FocusedUserStore';
import { PageHeader } from '../../PageHeader';

export const UserHeader: React.FC = () => {
  const data = FocusedUserStore.useValue()

  return <PageHeader fields={<></>}>
    <Userna
}