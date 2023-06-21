import { publishErrorUnexpected } from '../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../general.type';

function setupErrorHandle() {
  // this can be placed here if not using dashboard or logger
  // just catching all errors here and console.logging them
  // const sub = new Sub();
  // sub.subscribe('error-expected');
  // sub.subscribe('error-unexpected');
  // sub.listen(({ channel, logLevel, message }) => {
  //   if (channel === 'error-expected') {
  //     const castedMessage = message as GenericError;
  //     console.log(handleErrorExpected(castedMessage));
  //   } else if (channel === 'error-unexpected') {
  //     const castedMessage = message as Error;
  //     void appendFile(
  //       './err.txt',
  //       `${JSON.stringify([castedMessage, castedMessage.message, castedMessage.stack])}\n`,
  //     ).then(() => {
  //       console.log(handleErrorUnexpected(castedMessage));
  //       return;
  //     });
  //   }
  // });
  process.on('uncaughtException', (e: Readonly<Error>) => {
    publishErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
  process.on('unhandledRejection', (e: Readonly<Error>) => {
    publishErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
}

export { setupErrorHandle };
