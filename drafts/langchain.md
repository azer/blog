---
layout: blog-post.njk
title: "Local AI Assistants with Langchain and Ollama"
createdAt: "2023-11-09T00:00:00.000Z"
---

Locally-run LLMs like Mistral and LLama still don't match OpenAI's competitive pricing policy for production purposes. But I think this will change in the future. Privacy and need for minimum network latency will eventually become higher priority.

We can already run LLMs with [ollama](https://ollama.ai) and create custom & private assistants using [LlamaIndex](https://www.llamaindex.ai/) [Langchain](https://www.langchain.com/). To give an example, I'll walk through creating a local assistant that loads a directory of documents and allow us ask questions & get high quality answers.






I've tried two use cases in my local computer:

* Chatting with my local documents (mistral)
* Coding assistant (phind-codellama)

I've used  to serve the models and  to load files & stream into the model as context.

We can already run models like Mistral 7b and Phind locally in our computers using [Ollama](https://ollama.ai). Both of these models' performance are actually quite promising, and some folks already started integrating them to their workflows.



One interesting use case is providing large context documents to them, such as a directory of files in our local computer. This would allow us not share our personal data with OpenAI when it's necessary.
