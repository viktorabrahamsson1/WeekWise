type HomePageNotesProps = {
  children: React.ReactNode;
};

function HomePageNotes({ children }: HomePageNotesProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white p-2 shadow-sm dark:bg-slate-800 sm:p-4">
      <h2 className="text-lg font-semibold"> Notes</h2>

      {children}
    </div>
  );
}

export default HomePageNotes;
