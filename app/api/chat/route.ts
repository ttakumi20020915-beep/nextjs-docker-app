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

    const text = await response.text();
    
    if (!response.ok) {
      console.error('Dify API Error:', response.status, text);
      throw new Error('Dify Error: ${response.status}');
    }

    const data = await response.json();
    return NextResponse.json({ 
      answer: data.answer,
      conversation_id: data.conversation_id 
    });
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}