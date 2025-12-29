# Extude

## Overview
Extude is a learning platform designed to help students study a wide range of subjects in a single place.  
The goal is to centralize study tools and resources, reducing fragmentation and improving the learning experience.

## Problem
Students often need to use multiple platforms to achieve different goals — one for organization, another for practice, another for tracking progress.  
This fragmentation increases friction, wastes time, and makes studying less efficient.

## Solution
Extude provides a unified platform where students can access multiple study-related functionalities in one environment, allowing them to focus on learning instead of managing tools.

## Architecture
The project follows a modular, service-oriented architecture to ensure scalability, security, and ease of evolution.

Key architectural aspects:
- Backend powered by **Supabase (PostgreSQL)** for reliability and performance
- **Edge Functions** used to reduce latency by executing logic closer to the user
- Services designed to evolve independently, reducing coupling and improving maintainability
- Security enforced through backend validation and database-level rules (RLS)

## Tech Stack
- **TypeScript**
- **Node.js**
- **PostgreSQL**
- **Supabase**
- **Supabase Edge Functions**

## Getting Started
> This project is currently running, but still under active development.

Basic steps to run locally:
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server

> Detailed setup instructions will be expanded as the project evolves.

## Key Technical Decisions
- **Supabase adoption:** chosen to reduce backend latency and simplify infrastructure management
- **Edge Functions:** used to minimize cold start impact and improve response times
- **Service-oriented structure:** improves security boundaries and allows independent feature evolution

## Project Status
🟡 **In active development**  
Core features are functional, with additional improvements and new functionalities planned.
