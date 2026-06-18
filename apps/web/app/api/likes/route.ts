import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Like or unlike a post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId, commentId, action } = body;

    if (!postId && !commentId) {
      return NextResponse.json(
        { error: 'Post ID or Comment ID is required' },
        { status: 400 }
      );
    }

    if (action === 'like') {
      // Add like
      const { error } = await supabase.from('likes').insert([
        {
          user_id: user.id,
          post_id: postId || null,
          comment_id: commentId || null,
        },
      ]);

      if (error) {
        // Ignore duplicate key errors
        if (!error.message.includes('duplicate')) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      }

      return NextResponse.json({ liked: true }, { status: 200 });
    } else if (action === 'unlike') {
      // Remove like
      let query = supabase.from('likes').delete().eq('user_id', user.id);

      if (postId) {
        query = query.eq('post_id', postId);
      } else if (commentId) {
        query = query.eq('comment_id', commentId);
      }

      const { error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ liked: false }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET like count for a post or comment
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const commentId = searchParams.get('commentId');

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    let query = supabase.from('likes').select('*', { count: 'exact' });

    if (postId) {
      query = query.eq('post_id', postId);
    } else if (commentId) {
      query = query.eq('comment_id', commentId);
    } else {
      return NextResponse.json({ error: 'Post ID or Comment ID is required' }, { status: 400 });
    }

    const { count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ count: count || 0 }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
