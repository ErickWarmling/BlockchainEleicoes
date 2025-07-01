import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Vote } from "@/core/entities/vote";

type ChartVotesByCandidateProps = {
  votes: Vote[];
};

type VoteCount = {
  candidateName: string;
  votes: number;
};

const ChartVotesByCandidate: React.FC<ChartVotesByCandidateProps> = ({
  votes,
}) => {
  const voteCounts: VoteCount[] =
    votes.length > 0
      ? votes.reduce((acc, vote) => {
          const candidate = acc.find(
            (v) => v.candidateName === vote.candidateName
          );
          if (candidate) {
            candidate.votes += 1;
          } else {
            acc.push({ candidateName: vote.candidateName!, votes: 1 });
          }
          return acc;
        }, [] as VoteCount[])
      : [];

  const maxVotes = Math.max(...voteCounts.map((vote) => vote.votes));
  const yAxisMax = Math.ceil(maxVotes * 1.1); // Adiciona 10% ao valor máximo

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Votes by Candidate</CardTitle>
        <CardDescription>Total votes by candidate</CardDescription>
      </CardHeader>
      <CardContent>
        {votes.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={voteCounts}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="candidateName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(name) =>
                    name.length > 10 ? name.slice(0, 10) + "..." : name
                  }
                >
                  <Label value="Candidates" position="bottom" offset={10} />
                </XAxis>
                <YAxis allowDecimals={false} domain={[0, yAxisMax]}>
                  <Label
                    value="Number of Votes"
                    angle={-90}
                    position="insideLeft"
                    offset={-10}
                  />
                </YAxis>
                <Tooltip />
                <Bar
                  dataKey="votes"
                  fill="#2196f3"
                  barSize={20}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 px-10 py-10">
              No votes yet
            </h2>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total votes received by each candidate
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartVotesByCandidate;
