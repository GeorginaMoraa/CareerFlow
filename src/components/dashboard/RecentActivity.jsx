const jobs = [
  {
    company: "Google",
    status: "Interview Tomorrow",
  },

  {
    company: "Microsoft",
    status: "Applied Yesterday",
  },

  {
    company: "Safaricom",
    status: "Offer Received",
  },

  {
    company: "OpenAI",
    status: "Technical Interview",
  },
];

export default function RecentActivity() {
  return (
    <div
      style={{
        background: "white",

        padding: 25,

        borderRadius: 18,

        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Recent Activity</h2>

      {jobs.map((job) => (
        <div
          key={job.company}

          style={{
            display: "flex",

            justifyContent: "space-between",

            padding: "15px 0",

            borderBottom: "1px solid #eee",
          }}
        >
          <strong>{job.company}</strong>

          <span>{job.status}</span>
        </div>
      ))}
    </div>
  );
}
