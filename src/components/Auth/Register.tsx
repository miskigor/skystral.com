import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserPlus } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp(email, password, username);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/forum');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md">
        <div className="border-2 border-red-600 p-8">
          <div className="flex items-center justify-center mb-8">
            <UserPlus className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {t('auth.register')}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {t('auth.register.subtitle')}
          </p>

          {error && (
            <div className="bg-red-600/10 border border-red-600 text-red-600 px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-white font-semibold mb-2">
                {t('auth.username')}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border-2 border-white text-white px-4 py-3 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border-2 border-white text-white px-4 py-3 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                {t('auth.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-white text-white px-4 py-3 focus:outline-none focus:border-red-600"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-bold py-4 hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? t('auth.loading') : t('auth.register.button')}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            {t('auth.have.account')}{' '}
            <Link to="/login" className="text-red-600 hover:text-red-500 font-semibold">
              {t('auth.login.link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
