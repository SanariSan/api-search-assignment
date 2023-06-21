import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useScreenDetails } from '../../../hooks/use-screen-details';
import { useMousePos } from '../../../hooks/use-mouse-pos';
import {
  setScreenDetailsUi,
  uiErrorSelector,
  userAuthIsAuthenticatedSelector,
} from '../../../store';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../../general.type';

const DebugContainer: FC = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  const { x, y } = useMousePos();

  useEffect(() => {
    publishLog(ELOG_LEVEL.DEBUG, { w, h });
    void d(setScreenDetailsUi({ w, h }));
  }, [w, h, d]);

  const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);
  const msg = useAppSelector(uiErrorSelector);
  // useEffect(() => {
  //   console.log(`isAuthenticated ${isAuthenticated} = ${Date.now()}`);
  // }, [isAuthenticated]);

  return (
    <>
      <pre
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          fontSize: '10px',
          width: 'max-content',
          zIndex: 99_999,
          display: 'block',
        }}
      >
        {/* Current page size - {`${w} x ${h}`} */}
        {/* {`${x} : ${y} : ${w} : ${h} : ${(x / w) * 100}`} */}
        {`${JSON.stringify({ isAuthenticated, msg })}`}
      </pre>
      <textarea
        readOnly
        // value={`isAuthenticated: ${isAuthenticated}\nusername: ${username}`}
        // value={JSON.stringify(liked, null, 2)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: '150px',
        }}
      />
    </>
  );
};
export { DebugContainer };
