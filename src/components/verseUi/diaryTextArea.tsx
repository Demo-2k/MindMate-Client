import React from 'react';
import styled from 'styled-components';

const DairyText = ({handleClick, setText}) => {
  return (
    <StyledWrapper>
      <div className="editor-container">
        <div className="header">
          <div className="window-controls">
            <div className="circle red" />
            <div className="circle yellow" />
            <div className="circle green" />
          </div>
          <div className="tab">
            <span>Бодлоо цэгцэл</span>
          </div>
          <button className="theme-button">устгах</button>
          <button className="theme-button" onClick={handleClick}>Хадгалах</button>
        </div>
        <div className="editor-wrapper">
          <div className="line-numbers" id="line-numbers">1<br />2<br />3<br /></div>
          <textarea onChange={(e)=>setText(e.target.value)} className="editor" id="editor" spellCheck="false" defaultValue={""} />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .editor-container {
    width: 900px;
    height: 500px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    background-color: #333;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .window-controls {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .red {
    background-color: #ff5f56;
  }

  .yellow {
    background-color: #ffbd2e;
  }

  .green {
    background-color: #27c93f;
  }

  .tab {
    background-color: #4b4b4b;
    padding: 8px 16px;
    border-radius: 4px;
    color: #ddd;
    flex-grow: 1;
  }

  .editor-wrapper {
    display: flex;
    flex-grow: 1;
  }

  .line-numbers {
    background-color: #2d2d2d;
    color: #ddd;
    padding: 16px;
    text-align: right;
    user-select: none;
    overflow: hidden;
    line-height: 1.5;
  }

  .editor {
    width: 100%;
    border: none;
    padding: 16px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    resize: none;
    outline: none;
    line-height: 1.5;
    overflow: auto;
  }

  .theme-button {
    background-color: #555;
    color: #fff;
    border: none;
    margin-left: 20px;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .dark-mode .header {
    background-color: #222;
  }

  .dark-mode .tab {
    background-color: #333;
  }

  .dark-mode .line-numbers {
    background-color: #1a1a1a;
  }

  .dark-mode .editor {
    background-color: #2a2a2a;
    color: #ddd;
  }

  .editor::-webkit-scrollbar,
  .line-numbers::-webkit-scrollbar {
    display: none;
  }

  .editor {
    -ms-overflow-style: none;
    scrollbar-width: none;
    line-height: 1.5;
    background: rgb(223, 225, 235);
    box-shadow:
      rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px,
      rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px,
      rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }

  .line-numbers {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }`;

export default DairyText;
