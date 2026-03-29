import React from 'react';
import Navigation from './src/Navigations';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Colors from './src/helper/Colors';
const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay:true
});

Sentry.init({
  dsn: 'https://392d82ce84c8c72bcec36d4aef5f21ad@o4510890914414592.ingest.us.sentry.io/4510890919657472',
  sendDefaultPii: true,
  enableLogs: true,

   replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0, // production me 0.1
  integrations: [
    routingInstrumentation,
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
    Sentry.mobileReplayIntegration({
  maskAllText: true,
  maskAllImages: true,
  maskAllVectors: true,
}),
Sentry.consoleLoggingIntegration({levels:['log','error','warn']})
  ],
});

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary2}} edges={['top']}>
        <Navigation />
        <Toast/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(App);
