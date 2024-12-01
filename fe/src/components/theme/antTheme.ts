import { ThemeConfig } from 'antd';

export const antdConfig: ThemeConfig = {
  token: {
    colorBgContainer: '#112a45',
    colorText: '#ffffff',
    colorTextDescription: '#ffffff',
    colorTextHeading: '#ffffff',
    colorIcon: '#ffffff'
  },
  components: {
    Button: {
      boxShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      boxShadowSecondary: 'none',
      boxShadowTertiary: 'none'
    }
  }
};
