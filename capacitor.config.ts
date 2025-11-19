import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'angular-ionic-capacitor-app-with-relational-storage',
  webDir: 'www',
  plugins: {
    EdgeToEdge: {
      backgroundColor: '#ffffff',
    },
    SplashScreen: {
      launchShowDuration: 100,
      launchAutoHide: true,
      splashImmersive: true,
      backgroundColor: "#ffffff"
    },
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/appDbNameDatabases',
      iosIsEncryption: true,
      iosKeychainPrefix: 'app-dbName',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite",
        biometricSubTitle: "Log in using your biometric"
      }
    },
  },
};

export default config;
