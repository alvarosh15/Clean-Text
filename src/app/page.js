import Editor from "./components/Editor";
import Title from "./components/Title";
import Options from "./components/Options";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-stretch bg-black p-16">
      <Options></Options>
      <Title></Title>
      <Editor></Editor>
    </main>
  );
}
