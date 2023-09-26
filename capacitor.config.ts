import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nsqldb.app',
  appName: 'nsqldb ',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
