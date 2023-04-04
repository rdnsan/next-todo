import { Divider } from 'antd';
import React from 'react';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <div>
      <Divider
        orientation="center"
        style={{ paddingInline: '2rem', borderBlockStartColor: '#ccc' }}
        data-testid="divider"
      >
        {title}
      </Divider>
    </div>
  );
}
