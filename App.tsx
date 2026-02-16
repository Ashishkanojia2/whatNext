import React from 'react';
import Navigation from './src/Navigations';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as Sentry from '@sentry/react-native';
const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay:true
});

Sentry.init({
  dsn: 'https://392d82ce84c8c72bcec36d4aef5f21ad@o4510890914414592.ingest.us.sentry.io/4510890919657472',
  // dsn: 'https://4c0745d2d10baabf9468a27253d74d3c@o4510890914414592.ingest.us.sentry.io/4510891563417600',
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
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <Navigation />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Sentry.wrap(App);
