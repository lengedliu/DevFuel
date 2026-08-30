import React, { useState } from 'react';
import { DevlogPost } from '../types';
import { Newspaper, Heart, MessageSquare, Tag, Search, Plus, Calendar, Clock, Lock } from 'lucide-react';

interface PostsTabProps {
  posts: DevlogPost[];
  isCreatorMode: boolean;
  onLikePost: (id: string) => void;
  onAddComment: (postId: string, text: string, name: string) => void;
  onOpenCreatePostModal?: () => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({
  posts,
  isCreatorMode,
  onLikePost,
  onAddComment,
  onOpenCreatePostModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(posts[0]?.id || null);

  // Comment state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, { name: string; text: string }>>({});
  const [postComments, setPostComments] = useState<Record<string, Array<{ name: string; text: string; date: string }>>>({
    'post-1': [
      { name: 'Alex M.', text: 'The delta protocol speedup is insane! Mac to Android sync is under a second now.', date: '1 day ago' },
      { name: 'Dr. Lin', text: 'Thank you ZenCoder! The AST auto-merge for markdown tables worked smoothly.', date: 'Yesterday' },
    ],
    'post-2': [
      { name: 'Sophie V.', text: 'Cloudflare R2 preset saved me so much hassle configuring CORS headers!', date: '5 days ago' },
    ],
  });

  const categories = ['All', 'Release', 'Update', 'Roadmap'];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSummary = post.summary.toLowerCase().includes(q);
      return matchTitle || matchSummary;
    }
    return true;
  });

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const current = commentInputs[postId];
    if (!current || !current.text.trim()) return;

    const newComment = {
      name: current.name.trim() || 'Supporter',
      text: current.text.trim(),
      date: 'Just now',
    };

    setPostComments((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));

    onAddComment(postId, current.text, current.name);

    setCommentInputs((prev) => ({
      ...prev,
      [postId]: { name: '', text: '' },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Developer Log & Release Updates
            </h2>
            <p className="text-xs text-slate-400">
              Technical articles, release notes, and roadmap progress from ZenCoder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isCreatorMode && onOpenCreatePostModal && (
            <button
              onClick={onOpenCreatePostModal}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" /> Publish Update
            </button>
          )}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          const comments = postComments[post.id] || [];

          return (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-3xl overflow-hidden shadow-xl transition-all"
            >
              {/* Optional Header Image */}
              {post.image && (
                <div className="h-64 sm:h-80 w-full overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="text-amber-400">By ZenCoder</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {post.summary}
                  </p>
                </div>

                {/* Expanded Full Content */}
                {isExpanded ? (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                    {post.content}

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap pt-3">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-400 text-xs font-mono border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setExpandedPostId(post.id)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Read full post & discussions →
                  </button>
                )}

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-rose-400 border border-slate-800 transition-all"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span className="font-bold">{post.likes} Likes</span>
                    </button>

                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{comments.length} Comments</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <button
                      onClick={() => setExpandedPostId(null)}
                      className="text-xs text-slate-500 hover:text-slate-300"
                    >
                      Collapse
                    </button>
                  )}
                </div>

                {/* Comments Drawer (When Expanded) */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span>Supporter Comments ({comments.length})</span>
                    </h4>

                    {/* New Comment Form */}
                    <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id]?.name || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: { ...(prev[post.id] || { text: '' }), name: e.target.value },
                            }))
                          }
                          placeholder="Your Name (Optional)"
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={commentInputs[post.id]?.text || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: { ...(prev[post.id] || { name: '' }), text: e.target.value },
                            }))
                          }
                          placeholder="Add a comment or question..."
                          className="sm:col-span-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                        >
                          Post Comment
                        </button>
                      </div>
                    </form>

                    {/* Existing Comments List */}
                    <div className="space-y-2 pt-2">
                      {comments.map((cmt, idx) => (
                        <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                            <span className="font-bold text-amber-300">{cmt.name}</span>
                            <span>{cmt.date}</span>
                          </div>
                          <p className="text-slate-200">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
