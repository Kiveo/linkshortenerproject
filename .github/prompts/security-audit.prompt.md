---
agent: Plan
---

<!-- changed to Plan to mimic a sub/pro copilot. Missing sub agents in free tier most likely -->

Perform a security audit of this codebase to detect any potential security vulnerabilities in this project.

This initial audit and issue-selection step should work in standard chat mode when the environment can read the repository. Do not require Agent mode for the initial report. Agent mode is only needed later, after the user selects which issues to fix, when delegating the actual remediation work to subagents.

If the environment cannot read repository files or execute commands, stop and explain that the audit requires workspace access. Do not show raw tool-call failures, stack traces, or code dumps from missing APIs.

Output your findings as a markdown formatted table with the following columns (ID should start at 1 and auto-increment, File Path should be a link to the file): "ID", "Severity", "Issue", "File Path", "Line Number(s)", and "Recommendation".

Next, ask the user which issues they want to fix by having the user select either "all" or providing a comma separated list of IDs. After their reply, if a subagent tool is available, run a separate sub agent (#runSubagent) to fix each issue that the user has specified. Each sub agent should report back with a simple `subAgentSuccess: true | false`. If no subagent tool is available, explain that the environment cannot execute fixes and ask the user to rerun in Agent mode with workspace tools enabled only for the remediation step.