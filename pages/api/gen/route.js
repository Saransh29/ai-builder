export const config = {
  runtime: "edge",
};
export default async function handler(req, res) {
  console.log(req.body);

  const baseUrl = "https://api.openai.com/v1/chat/completions";
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY2}`,
    },
  });
  //   res.status(200).json({
  //     id: "chatcmpl-70S7EJ18zd0MqDUCg3VncoM4KOy4m",
  //     object: "chat.completion",
  //     created: 1680342432,
  //     model: "gpt-3.5-turbo-0301",
  //     usage: {
  //       prompt_tokens: 134,
  //       completion_tokens: 735,
  //       total_tokens: 869,
  //     },
  //     choices: [
  //       {
  //         message: {
  //           role: "assistant",
  //           content: "some code here",
  //         },
  //         finish_reason: "stop",
  //         index: 0,
  //       },
  //     ],
  //   });
  //   res.status(200).json({ response });
  res.send(await response.json());
}
