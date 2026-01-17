import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.NEXT_PUBLIC_DIFY_API_KEY) {
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
      const errorData = await response.json().catch(() => null);
      console.error('Dify API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(`Dify API request failed: ${response.status} ${response.statusText}`);
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