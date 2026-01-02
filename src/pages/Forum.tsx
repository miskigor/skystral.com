import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { LogOut, LogIn, UserPlus, Plus, MessageSquare, User, Calendar } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

interface Profile {
  id: string;
  username: string;
}

interface Topic {
  id: string;
  title: string;
  author_id: string;
  created_at: string;
  profiles: Profile;
  post_count?: number;
}

interface Post {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  profiles: Profile;
}

export default function Forum() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      loadPosts(selectedTopic.id);
    }
  }, [selectedTopic]);

  const loadTopics = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('forum_topics')
      .select(`
        *,
        profiles (id, username)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const topicsWithCount = await Promise.all(
        data.map(async (topic) => {
          const { count } = await supabase
            .from('forum_posts')
            .select('*', { count: 'exact', head: true })
            .eq('topic_id', topic.id);
          return { ...topic, post_count: count || 0 };
        })
      );
      setTopics(topicsWithCount);
    }
    setLoading(false);
  };

  const loadPosts = async (topicId: string) => {
    const { data, error } = await supabase
      .from('forum_posts')
      .select(`
        *,
        profiles (id, username)
      `)
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setPosts(data);
    }
  };

  const createTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !user) return;

    const { data, error } = await supabase
      .from('forum_topics')
      .insert([{ title: newTopicTitle, author_id: user.id }])
      .select(`
        *,
        profiles (id, username)
      `)
      .single();

    if (!error && data) {
      setTopics([{ ...data, post_count: 0 }, ...topics]);
      setNewTopicTitle('');
      setShowNewTopic(false);
    }
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user || !selectedTopic) return;

    const { data, error } = await supabase
      .from('forum_posts')
      .insert([{ content: newPost, author_id: user.id, topic_id: selectedTopic.id }])
      .select(`
        *,
        profiles (id, username)
      `)
      .single();

    if (!error && data) {
      setPosts([...posts, data]);
      setNewPost('');
      loadTopics();
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b-4 border-red-600 bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t('forum.title')}</h1>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">{t('forum.logout')}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center space-x-2 border-2 border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-semibold">{t('auth.login')}</span>
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="flex items-center space-x-2 bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-semibold">{t('auth.register')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="border-2 border-white p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-red-600" />
                {t('forum.topics')}
              </h2>

              {user && (
                <button
                  onClick={() => setShowNewTopic(!showNewTopic)}
                  className="w-full bg-red-600 text-white font-bold py-3 mb-4 hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('forum.new.topic')}</span>
                </button>
              )}

              {user && showNewTopic && (
                <form onSubmit={createTopic} className="mb-6">
                  <input
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder={t('forum.topic.placeholder')}
                    className="w-full bg-black border-2 border-white text-white px-4 py-2 mb-2 focus:outline-none focus:border-red-600"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white font-bold py-2 hover:bg-red-700 transition-colors"
                    >
                      {t('forum.create')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewTopic(false)}
                      className="flex-1 border-2 border-white text-white font-bold py-2 hover:bg-white hover:text-black transition-colors"
                    >
                      {t('forum.cancel')}
                    </button>
                  </div>
                </form>
              )}

              {loading ? (
                <div className="text-center text-gray-500">{t('loading')}</div>
              ) : topics.length === 0 ? (
                <div className="text-center text-gray-500">
                  {t('forum.no.topics')}
                </div>
              ) : (
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left p-4 border-2 transition-colors ${
                        selectedTopic?.id === topic.id
                          ? 'border-red-600 bg-red-600/10'
                          : 'border-white hover:border-red-600'
                      }`}
                    >
                      <div className="font-bold mb-1">{topic.title}</div>
                      <div className="text-sm text-gray-400 flex items-center justify-between">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {topic.profiles.username}
                        </span>
                        <span>{topic.post_count} {t('forum.responses')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedTopic ? (
              <div className="border-2 border-white p-6">
                <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-red-600">
                  {selectedTopic.title}
                </h2>

                <div className="space-y-4 mb-8">
                  {posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      {t('forum.no.responses')}
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className="border-l-4 border-red-600 pl-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 text-red-600 font-bold">
                            <User className="w-4 h-4" />
                            <span>{post.profiles.username}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                        <p className="text-gray-200">{post.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {user ? (
                  <form onSubmit={createPost} className="border-t-2 border-red-600 pt-6">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder={t('forum.reply.placeholder')}
                      rows={4}
                      className="w-full bg-black border-2 border-white text-white px-4 py-3 mb-4 focus:outline-none focus:border-red-600"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-red-600 text-white font-bold px-8 py-3 hover:bg-red-700 transition-colors"
                    >
                      {t('forum.post.reply')}
                    </button>
                  </form>
                ) : (
                  <div className="border-t-2 border-red-600 pt-6 text-center">
                    <p className="text-gray-400 mb-4">{t('forum.login.to.reply')}</p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => navigate('/login')}
                        className="flex items-center space-x-2 border-2 border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
                      >
                        <LogIn className="w-5 h-5" />
                        <span className="font-semibold">{t('auth.login')}</span>
                      </button>
                      <button
                        onClick={() => navigate('/register')}
                        className="flex items-center space-x-2 bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span className="font-semibold">{t('auth.register')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-white p-12 text-center">
                <MessageSquare className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t('forum.select.topic')}</h3>
                <p className="text-gray-400">
                  {t('forum.select.description')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
