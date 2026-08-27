import {
  useCallback,
  useMemo,
  memo,
  useRef,
  useReducer
} from "react";

import useWindowWidth from "./hooks/useWindowWidth";
import useFetch from "./hooks/useFetch";
import "./App.css";

function counterReducer(state, action) {
  if (action.type === "increment") {
    return {
      ...state,
      count: state.count + action.payload
    }
  }

  if (action.type === "decrement") {
    return {
      ...state,
      count: state.count - action.payload
    }
  }

  if (action.type === "reset") {
    return {
      ...state,
      count:0
    };
  }

  return state;
}

const Child = memo(function Child({ onHello }) {
  console.log("CHILD RENDERED");

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={onHello}>
        Say Hello
      </button>
    </div>
  );
});

function App() {
  const initialState = {
    count: 0,
    step:1
  }
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [name1, setName1] = useReducer(
    (_, value) => value,
    "Sasha"
  );

  const [products, setProducts] = useReducer(
    (_, value) => value,
    [
      {
        id: 1,
        name: "Laptop",
        price: 1200
      },
      {
        id: 2,
        name: "Phone",
        price: 700
      },
      {
        id: 3,
        name: "Keyboard",
        price: 100
      },
      {
        id: 4,
        name: "Monitor",
        price: 400
      }
    ]
  );

  const inputRef = useRef(null);

  const width = useWindowWidth();

  const { data, loading, error } = useFetch(
    "https://randomuser.me/api/"
  );

  const totalProducts = products.length;

  const expensiveProducts = products.filter(
    (product) => product.price >= 500
  ).length;

  const totalPrice = useMemo(() => {
    console.log("Calculating Products Price");

    return products.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [products]);

  const sayHello = useCallback(() => {
    console.log(`Hello ${name1}`);
  }, [name1]);

  function addProduct() {
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: "New Product",
        price: 545
      }
    ]);
  }

  function clearAndFocus() {
    setName1("");
    inputRef.current?.focus();
  }

  return (
    <div>
      <h1>React Practice</h1>

      {/* useReducer */}
      <section>
        <h2>useReducer Counter</h2>

        <p>Count: {state.count}</p>

        <button
          onClick={() =>
            dispatch({
              type: "increment",
              payload:1
             })
          }
        >
          +
        </button>
        <button
            onClick={() =>
            dispatch({
              type: "increment",
              payload:5
               })
            }
          >
            +5
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "decrement",
              payload:1
             })
          }
        >
          -
        </button>

        <button
          onClick={() =>
            dispatch({ type: "reset" })
          }
        >
          Reset
        </button>
      </section>

      <hr />

      {/* Custom hook */}
      <section>
        <h2>Custom Hook</h2>

        <p>
          Window width: {width}px
        </p>
      </section>

      <hr />

      {/* useMemo */}
      <section>
        <h2>Products / useMemo</h2>

        <p>
          Total products: {totalProducts}
        </p>

        <p>
          Expensive products: {expensiveProducts}
        </p>

        <p>
          Total price: ${totalPrice}
        </p>

        <button onClick={addProduct}>
          Add Product
        </button>
      </section>

      <hr />

      {/* useRef + controlled input */}
      <section>
        <h2>useRef</h2>

        <input
          ref={inputRef}
          type="text"
          value={name1}
          onChange={(event) =>
            setName1(event.target.value)
          }
        />

        <button
          onClick={() =>
            inputRef.current?.focus()
          }
        >
          Focus
        </button>

        <button onClick={clearAndFocus}>
          Clear & Focus
        </button>
      </section>

      <hr />

      {/* memo + useCallback */}
      <section>
        <h2>memo + useCallback</h2>

        <Child onHello={sayHello} />
      </section>

      <hr />

      {/* Custom useFetch */}
      <section>
        <h2>useFetch</h2>

        {loading && (
          <p>Loading...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {data && (
          <div>
            <p>
              Name:{" "}
              {data.results[0].name.first}{" "}
              {data.results[0].name.last}
            </p>

            <p>
              Email: {data.results[0].email}
            </p>

            <img
              src={
                data.results[0].picture.large
              }
              alt={`${data.results[0].name.first} ${data.results[0].name.last}`}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;