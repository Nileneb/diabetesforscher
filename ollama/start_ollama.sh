#!/bin/bash

ollama serve &


sleep 10


ollama pull bionic5c/biomistral-7b-q4-k-m


tail -f /dev/null
