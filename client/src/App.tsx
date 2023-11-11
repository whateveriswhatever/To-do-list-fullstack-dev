import Header from "../components/Header";
import Main from "../components/Main";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center">
      <div id="to-do-list">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
