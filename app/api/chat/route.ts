import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.DIFY_API_KEY) {
      throw new Error('DIFY_API_KEY is not set in environment variables');
    }

    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer app-XE264XfzGMOgYW4IBWvS0IvP`,
        // 変数に置き換える
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: 'blocking',
        conversation_id: '',
        user: 'user-123',
        files: []
      }),
    });

    if (!response.ok) {
      const text = await response.text();

      // Dify のエラーをそのまま返す
      return NextResponse.json(
        {
          error: 'Dify API Error',
          status: response.status,
          body: text,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      answer: data.answer,
      conversation_id: data.conversation_id,
    });
  } catch (error) {
      // ここは「本当に予期せぬエラー」だけ
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
  }
} 