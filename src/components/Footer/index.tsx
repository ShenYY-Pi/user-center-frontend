import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const copyrightMessage = '2024  ShenYy';
  return (
    <DefaultFooter
      copyright={copyrightMessage}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Syy Github |',
          href: 'https://github.com/ShenYY-Pi/',
          blankTarget: true,
        },
        {
          key: 'BeiAn',
          title: '鄂ICP备2021004157号-1',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
