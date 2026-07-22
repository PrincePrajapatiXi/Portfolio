import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Star, GitFork, Code2, Activity, ExternalLink } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const GITHUB_USERNAME = "PrincePrajapatiXi";

export const GitHubStats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
    topLanguages: [],
    recentRepos: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

        // Get top languages
        const langMap = {};
        repos.forEach((repo) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count, percentage: Math.round((count / repos.length) * 100) }));

        // Recent repos
        const recentRepos = repos
          .filter((r) => !r.fork)
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            description: r.description || "No description",
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
          }));

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          topLanguages,
          recentRepos,
        });
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const langColors = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Python: "#3776AB",
    Java: "#ED8B00",
    "C++": "#00599C",
    default: "#8b949e",
  };

  const statCards = [
    { icon: Code2, label: "Repositories", value: stats.publicRepos, suffix: "+" },
    { icon: Star, label: "Total Stars", value: stats.totalStars, suffix: "" },
    { icon: Activity, label: "Followers", value: stats.followers, suffix: "" },
  ];

  return (
    <section id="github" className="py-12 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3"
          >
            Open Source
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight"
          >
            GitHub{" "}
            <span className="text-muted-foreground font-serif italic font-normal">Activity</span>
          </motion.h2>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="glass-strong p-4 md:p-8 rounded-2xl md:rounded-[2rem] text-center group hover:bg-white/[0.03] transition-colors border border-white/5"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">
                {!loading ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5"
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Top Languages</h3>
            <div className="space-y-3 md:space-y-4">
              {stats.topLanguages.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: langColors[lang.name] || langColors.default }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: langColors[lang.name] || langColors.default }}
                    />
                  </div>
                </div>
              ))}
              {stats.topLanguages.length === 0 && !loading && (
                <p className="text-muted-foreground text-sm">No language data available</p>
              )}
            </div>
          </motion.div>

          {/* Recent Repos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5"
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Recent Repositories</h3>
            <div className="space-y-3">
              {stats.recentRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{repo.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: langColors[repo.language] || langColors.default }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork className="w-3 h-3" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
              {stats.recentRepos.length === 0 && !loading && (
                <p className="text-muted-foreground text-sm">No repos found</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* View on GitHub button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 hover:border-primary/30 text-sm font-medium hover:text-primary transition-all"
          >
            <Github className="w-4 h-4" />
            View Full Profile on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
