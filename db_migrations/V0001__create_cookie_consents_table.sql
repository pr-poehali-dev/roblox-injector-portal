CREATE TABLE IF NOT EXISTS cookie_consents (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    session_id VARCHAR(255) NOT NULL,
    consent_type VARCHAR(50) NOT NULL CHECK (consent_type IN ('accepted', 'declined')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_id)
);

CREATE INDEX idx_cookie_consents_session ON cookie_consents(session_id);
CREATE INDEX idx_cookie_consents_created ON cookie_consents(created_at);

COMMENT ON TABLE cookie_consents IS 'Хранит согласия пользователей на использование cookie';
COMMENT ON COLUMN cookie_consents.user_id IS 'ID пользователя из Google Auth (опционально)';
COMMENT ON COLUMN cookie_consents.session_id IS 'Уникальный ID сессии браузера';
COMMENT ON COLUMN cookie_consents.consent_type IS 'Тип согласия: accepted или declined';
COMMENT ON COLUMN cookie_consents.ip_address IS 'IP адрес пользователя';
COMMENT ON COLUMN cookie_consents.user_agent IS 'User Agent браузера';
