#!/usr/bin/env node

console.log("[TEST] jira.[Smart Commits]");

/** 
 * When you manage your project's repositories in Bitbucket or GitHub, or use Fisheye to browse and search your repositories, 
 * you can process your Jira Software issues using special commands, called Smart Commits, in your commit messages.
 * You can:
 * 
 *  - comment on issues
 *  - record time tracking information against issues
 *  - transition issues to any status defined in the Jira Software project's workflow. 
 * 
 * There are other actions available if you use Crucible for software reviews. See Using Smart Commits in the Crucible documentation.
 * A Smart Commit command must not span more than one line (i.e. you cannot use carriage returns in the command), 
 * but you can add multiple commands to the same line. See this example below.
 * 
 * # Smart Commit commands
 * The basic syntax for a Smart Commit message is:
 * 
 *  - <ignored text> <ISSUE_KEY> <ignored text> #<COMMAND> <optional COMMAND_ARGUMENTS>
 * 
 * Any text between the issue key and the command is ignored.
 * 
 * There are three commands you can use in your Smart Commit messages:
 *  - comment
 *  - time
 *  - transition
 *    - TEST 3: INK-23 #in-progress #comment 第 3 次尝试 (OK)
 *    - TEST 4: INK-23 #to-do #comment 第 4 次尝试 (PENDING)
 */
