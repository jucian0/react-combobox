1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- The difference is that PureComponent does a shallow comparison, while Component does a deep comparison, which results in less re-rendering. You should make sure the PureComonent children are PureComponent too.

- You should never mutate the parent state, or your component will not be updated, that happens because of the shallow comparison. Shallow comparison compare values for primitives, and reference for objects, when mutating an object, the reference will be the same, so your component will not be updated, same reference = same object in shallow comparison.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

- Context is used to pass data from one component to another. It's helpful when you have many components interested in the same state or data.
- ShouldComponentUpdate can be dangerous with Context because it can break the propagation of the changes in the tree. Especially for PureComponent which automatically does this job for us.

3. Describe 3 ways to pass information from a component to its PARENT.

- Props - declare a callback function and pass it as a prop to the component. The callback function will be called and the data will be passed as an argument.
- Context API (Context + useContext) - Context can be helpful to pass information from one component to its parent. (It's necessary to pass a function to update the data inside the component)
- State management libraries - (Redux, Zustand,...), those libraries create an external store, this store can be accessed from any component in the tree. These components can receive updates, and promote the updates.

4. Give 2 ways to prevent components from re-rendering.

- First way is to use useMemo or memo, it prevents rerender by memoing the state, and prevents re-rendering.
- Second way is to use useCallback, which prevents rerender by memoing function, functions are recreated whenever a component is re-rendered. If this function changes the state, it will re-render the component, or even have an infinite loop.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

- A fragment is used to render multiple components in one place without a DOM as a parent.

  ```jsx
  const Item = ({ item }) => (
    <>
      <p>Name:</p>
      <p>{item.name}</p>
    </>
  );
  ```

6. Give 3 examples of the HOC pattern.

- HOC can be used to wrap a Modal component, and control the Modal state. `withToggle`.
- HOC can be used to wrap pages and control access to them by preventing and redirecting users if they don't have the required permissions. `useAuth`
- HOC can also be used to wrap a Form component, and control the Form state. `withForm`

7. What's the difference in handling exceptions in promises, callbacks
   and async…await?

- Promises are async, and callbacks are sync. Promises callback will be called when the promise is resolved or rejected. Sync callbacks are called immediately.

- Dealing with exceptions in promises, can be done with try/catch (async/await) or then/catch (callbacks).

  When using then/catch you don't need to use try/catch because the catch will handle the error. But when using async/await, you need to use try/catch because rejected promise will throw an error.

  ```js
  // async with try/catch
  async function getItems() {
    try {
      const response = await fetch('something');
      // do something with response
    } catch (error) {
      // handle error
    }

    // then/catch
    function getItems() {
      return fetch('something').then(response => {
        // do something with response
      }).catch(error => {
        // handle error
      })
    }

    //sync callbacks
    function getItems(success, error) {
        try{
           const data = JSON.parse('something');
           success(data);
        }catch(error){
           error(error);
        }
    }

    getItems((data)={
      // do something with data
    }, (error) => {
      // handle error
    });
  ```

8. How many arguments does setState take and why is it async.

- setState takes 2 arguments, the first one is the next state, and the second one is a callback function.
- State in React is asynchronous because updating the state, whenever the setState is called, will be an expensive operation. So React create a pending state, and update it after some other operation.

9. List the steps needed to migrate a Class to a Function Component.

- Class -> Function Component
- Create or convert the class to a function.
- Move states to `useState` or `useReducer`.
- Convert on `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` to `useEffect`.

  ```jsx
  useEffect(() => {
    // do something whenever something changes
    // componentDidUpdate
    // dangerous
  });

  useEffect(() => {
    // do something when component is mounted
    // componentDidMount
  }, []);

  useEffect(() => {
    // do something when a state is updated
    // componentDidUpdate
    // can be dangerous
  }, [state]);

  useEffect(() => {
    return () => {
      // do something when component is unmounted
      // componentWillUnmount
    };
  }, []);
  ```

- remove `render` in favor of `return` keyword, `return`.

10. List a few ways styles can be used with components.

React components can be styled in many ways.

- CSS (import css file, css.module)
- CSS-in-JS (Styled Components, Emotion, vanilla-stracts...).
- Object style, could be present in the previous item.
- PostCSS (Tailwind CSS, Panda CSS,...).

11. How to render an HTML string coming from the server.

You can do that by using `dangerousSetInnerHTML`.
