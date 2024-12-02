import { ThemeConfig } from 'antd';
import colors from './colors';

export const antdConfig: ThemeConfig = {
  token: {
    colorBgContainer: colors.containerBg,
    colorText: colors.text,
    colorTextDescription: colors.text,
    colorTextHeading: colors.text,
    colorIcon: colors.text,
    colorBgElevated: '#111d2c',
    colorLink: '#8dcff8'
  },
  components: {
    Button: {
      boxShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      boxShadowSecondary: 'none',
      boxShadowTertiary: 'none'
    },
    Modal: {
      contentBg: colors.containerBg,
      headerBg: colors.containerBg
    },
    Menu: {
      darkItemBg: colors.containerBg
    }
  }
};
