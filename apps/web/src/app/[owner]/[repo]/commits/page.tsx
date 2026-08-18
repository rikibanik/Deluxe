type RepoCommitsPageProps = {
  params: Promise<{ owner: string; repo: string }>;
};

export default async function RepoCommitsPage({ params }: RepoCommitsPageProps) {
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
