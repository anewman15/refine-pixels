import React, { useState } from 'react';
import { useMany } from '@pankod/refine-core';
import { Icons, Avatar } from '@pankod/refine-antd';
import { User } from 'types/user';
import { Pixel } from 'types/pixel';
import { getUserQueryIds } from 'utility/getUserQueryIds';

type ContributorsProps = {
  pixels: Pixel[] | undefined;
};

const { UserOutlined } = Icons;

const Contributors: React.FC<ContributorsProps> = ({ pixels }) => {

  const userQueryIds = getUserQueryIds(pixels);

  const contributorsData = useMany<User>({
    resource: "users",
    ids: [...userQueryIds],
  });

  const contributors = contributorsData?.data?.data;
  

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {contributors?.map(user => (
        <Avatar
          icon={<UserOutlined />}
          src={user.avatar_url}
          size={{ xs: 24, sm: 32, md: 40 }}
        />
      ))}
    </div>
  );
}

export default Contributors;
