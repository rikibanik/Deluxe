export default async function RepoTreePage({ params }) {
  const { owner, repo } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>
        {owner}/{repo} — files
      </h1>
      {/* TODO: FileTree component */}
    </main>
  );
}
