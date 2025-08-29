export const DoneBreathExercise = ({ onDone }: { onDone: () => void }) => {
  const handleDoneClick = () => {
    onDone();
  };

  return (
    <div className="w-[200px] h-[300px] bg-yellow-300 absolute bottom-0">
      {" "}
      <p className="w-[300px] bg-pink-300 p-2 rounded-lg">
        Сайн байна, чи амьсгалын дасгал хийлээ. Чиний сэтгэл санаа бага зэрэг
        хөнгөрсөн байх гэж найдаж байна. Одоо надтай ярилцаж үзмээр байна уу?
      </p>
      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTFkeGJvbWNqNjBqY2RxaWgxODd0M2tkcjVyaXB4YW5pbDc3MjU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1w019F86H4vfpkZoRz/giphy.gif"
        alt="Pink&Ven"
      />
      <button onClick={handleDoneClick} className="text-black">
        Чат руу буцах
      </button>
    </div>
  );
};
