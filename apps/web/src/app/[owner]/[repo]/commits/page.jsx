export default async function RepoCommitsPage({ params }) {
  const { owner, repo } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>
        {owner}/{repo} — commits
      </h1>
      {/* TODO: CommitList component */}
    </main>
  );
}
