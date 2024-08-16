type DebounceFunction<T = unknown> = (...args: Array<T>) => void;

let timeoutId: number = 0;


// ? this design for single debouce function
// ! for example : you have 2 task that you want to debouce
// ! this function just gonna invoke the last task
export const debounce = <T extends DebounceFunction>(func: T,delay: number) => (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
};
