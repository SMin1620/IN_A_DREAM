import HTMLFlipBook from "react-pageflip";
import "./styles/BookPage.style.css";

function MyBook(props) {
  return (
    <HTMLFlipBook className="MyBookWrapper" width={500} height={500}>
      <div className="demoPage">Page 1</div>
      <div className="demoPage">Page 2</div>
      <div className="demoPage">Page 3</div>
      <div className="demoPage">Page 4</div>
    </HTMLFlipBook>
  );
}

export default MyBook;
