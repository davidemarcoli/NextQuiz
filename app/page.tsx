import ListQuiz from "@/app/quiz/list/page";

export default async function Home() {


  return (
      <>
        {/* @ts-expect-error Server Component */}
        <ListQuiz />
      </>
  );
}
