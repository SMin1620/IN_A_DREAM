import React from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
const CreateDreamDiaryPage = () => {
  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      오늘의 꿈 일기를 작성해보아요.
      <Button top={20} right={10} position="absolute"></Button>
      <Input
        type="text"
        placeholder="일기 제목을 입력하세요."
        onChange={(e) => inputTitle(e)}
      />
    </div>
  );
};

export default CreateDreamDiaryPage;
