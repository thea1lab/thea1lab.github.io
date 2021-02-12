#!/bin/sh

session="a1-site"
tmux kill-session -t $session
session_exists=$(tmux list-sessions | grep $session)

if [ "$session_exists" = "" ]; then
    tmux new-session -d -s $session -x "$(tput cols)" -y "$(tput lines)"

    tmux rename-window -t 0 "site"
    tmux send-keys -t 0 "vim config.toml" C-m
    tmux split-window -v -p 25
    tmux select-pane -t 1
    tmux send-keys -t 1 "hugo server -D" C-m
    tmux select-pane -t 0
fi

tmux select-window -t $session:0
tmux attach-session -t $session
