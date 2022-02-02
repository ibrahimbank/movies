import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const getMovies = async () => {
    try {
      await fetch(
        "https://adaorachi.github.io/esetech-assessment-api/game-data.json"
      )
        .then((response) => {
          if (!response.ok) return "something went wrong";
          else {
            const res = response.json();
            return res;
          }
        })
        .then((data) => {
          let res = data;
          setData(res);
        });
    } catch (error) {
      alert(error);
    }
  };

  const search = text
    ? data.filter((data) => {
        return data.name.toLowerCase().includes(text.toLowerCase());
      })
    : data;

  useEffect(() => {
    setTimeout(() => {
      getMovies();
    }, 2000);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setText("");
  };

  return (
    <div className="Container">
      <div className="seacrh__form">
        <form action="" className="form">
          <h2>Filters Result</h2>
          <label>
            Name(Contains)
            <input
              type="text"
              placeholder="Text String"
              className="input"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </label>

          <label htmlFor="">
            Order By
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="20px"
                height="10px"
              >
                <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
              </svg> */}
            <select name="" id="" className="input">
              <option></option>
              <option>released-dates </option>
              <option>ratings</option>
            </select>
          </label>

          <button className="btn__clear" onClick={handleClick}>
            Clear
          </button>
        </form>
      </div>

      <div className="movies__cards">
        <div className="card">
          <div className="card__details">
            {!text
              ? data.map((data) => {
                  return (
                    <div className="test" key={data.id}>
                      <div className="card__color"></div>
                      <div className="test2">
                        <div className="card__detail">
                          <div className="card__name__date">
                            <h2 className="card__name">{data.name}</h2>
                            <h6 className="card__date">
                              Release Date:{data.first_release_date}
                            </h6>
                          </div>
                          <p className="card__description">{data.summary}</p>
                        </div>
                        <button className="rating">
                          {data.rating.toFixed(1).replace(/[.,]0$/, "")}
                        </button>
                      </div>
                    </div>
                  );
                })
              : search.map((data) => {
                  return (
                    <div className="test" key={data.id}>
                      <div className="card__color"></div>
                      <div className="test2">
                        <div className="card__detail">
                          <div className="card__name__date">
                            <h2 className="card__name">{data.name}</h2>
                            <h6 className="card__date">
                              Release Date:{data.first_release_date}
                            </h6>
                          </div>
                          <p className="card__description">{data.summary}</p>
                        </div>
                        <button className="rating">
                          {data.rating.toFixed(1).replace(/[.,]0$/, "")}
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
