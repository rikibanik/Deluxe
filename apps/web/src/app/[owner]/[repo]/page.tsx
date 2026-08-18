type RepoPageProps = {
  params: Promise<{ owner: string; repo: string }>;
};

export default async function RepoPage({ params }: RepoPageProps) {
  const { owner, repo } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>
        {owner}/{repo}
      </h1>
      {/* TODO: README, file tree */}
    </main>
  );
}
