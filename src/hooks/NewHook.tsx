import {useGestureEventsHandlersDefault} from '@gorhom/bottom-sheet';

const NewHook = () => {
  const ges = useGestureEventsHandlersDefault();

  // () => {
  //   return {
  //     handleOnStart: (a: any, b: any, c: any) => {
  //       'worklet';
  //       console.log('handleOnStart', b);
  //     },
  //     handleOnActive: (_, p: any) => {
  //       'worklet';
  //       console.log('handleOnActive', p);
  //     },
  //     handleOnEnd: (_, p: any) => {
  //       'worklet';
  //       console.log('handleOnEnd', p);
  //     },
  //   };
  // }
  return ges;
};

export default NewHook;
