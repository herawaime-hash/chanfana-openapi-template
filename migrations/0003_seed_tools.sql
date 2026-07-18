-- Migration number: 0003 	 2026-07-17T00:00:00.000Z

INSERT INTO tools (name, slug, category, provider, cost_tier, access_url, integration_status, tags, notes) VALUES
('Base44', 'base44', 'ai-agent', 'Base44', 'paid', 'https://base44.com', 'active', 'imessage,iphone,agent', 'Agents wired to iPhone/iMessage'),
('Manus Pro', 'manus-pro', 'ai-agent', 'Manus', 'paid', 'https://manus.im', 'active', 'agent,pro', 'General purpose agent'),
('Kimi Pro', 'kimi-pro', 'llm', 'Moonshot AI', 'paid', 'https://kimi.moonshot.cn', 'active', 'llm,40usd', '$40 plan'),
('ChatGPT Pro', 'chatgpt-pro', 'llm', 'OpenAI', 'paid', 'https://chatgpt.com', 'active', 'llm,pro', 'OpenAI pro tier'),
('Gemini Pro', 'gemini-pro', 'llm', 'Google', 'paid', 'https://gemini.google.com', 'active', 'llm,pro', 'Google Gemini pro tier'),
('GLM2 Pro', 'glm2-pro', 'llm', 'Zhipu AI', 'paid', 'https://chatglm.cn', 'active', 'llm,pro', 'GLM2 pro plan'),
('GitHub Copilot Agent', 'copilot-agent', 'ai-agent', 'GitHub', 'paid', 'https://github.com/features/copilot', 'active', 'native-ai,coding,agent', 'Most important tool; native AI built into GitHub'),
('GoPi', 'gopi', 'ai-agent', 'GoPi', 'free', NULL, 'planned', 'repo-access,chat', 'Chat with access to any repo'),
('Hermes VPS', 'hermes-vps', 'lab-environment', 'Self-hosted', 'paid', NULL, 'active', 'vps,hermes,telegram', 'VPS running Hermes agent'),
('Gemini Notebook Pro', 'gemini-notebook-pro', 'ai-agent', 'Google', 'paid', 'https://notebooklm.google.com', 'active', 'notebook,llm,research', 'Formerly Notebook LLM'),
('Flipper Zero', 'flipper-zero', 'cyber-hardware', 'Flipper Devices', 'paid', 'https://flipperzero.one', 'active', 'red-team,nrf,hardware', 'Flipper Zero + NRF series'),
('Saily/Saleae Charm', 'saleae-charm', 'cyber-hardware', 'Saleae', 'paid', 'https://www.saleae.com', 'active', 'saleae,charm,license', 'Licensed Saleae hardware'),
('Saleae Arm', 'saleae-arm', 'cyber-hardware', 'Saleae', 'paid', 'https://www.saleae.com', 'active', 'saleae,arm,license', 'Saleae Arm system'),
('Saleae Falcon', 'saleae-falcon', 'cyber-hardware', 'Saleae', 'paid', 'https://www.saleae.com', 'active', 'saleae,falcon,license', 'Saleae Falcon system'),
('Saleae Matrix', 'saleae-matrix', 'cyber-hardware', 'Saleae', 'paid', 'https://www.saleae.com', 'active', 'saleae,matrix,license', 'Saleae Matrix system'),
('Saleae Viper', 'saleae-viper', 'cyber-hardware', 'Saleae', 'paid', 'https://www.saleae.com', 'active', 'saleae,viper,license', 'Saleae Viper system'),
('Strict STRIX', 'strict-strix', 'cyber-software', 'STRIDE OSS', 'free', 'https://github.com/stride-oss/strix', 'planned', 'blue-team,purple-team,scenarios', 'Open-source adversary simulation and detection validation'),
('Telegram Bot Bridge', 'telegram-bridge', 'messaging-bridge', 'Telegram', 'free', NULL, 'active', 'telegram,bot,agent', 'Bridge for Telegram-based agents'),
('iMessage Bridge', 'imessage-bridge', 'messaging-bridge', 'Apple', 'free', NULL, 'planned', 'imessage,base44,iphone', 'Bridge for Base44 iMessage agents'),
('Cybersecurity Tool Site', 'cyber-tool-site', 'cyber-software', 'Self-hosted', 'paid', NULL, 'active', 'red-team,blue-team,purple-team,pentesting,ethical-hacking', 'Personal website hosting red/blue/purple team tools');

INSERT INTO skills (name, slug, description, input_schema, output_schema, tool_ids, steps) VALUES
('Purple-Team Scenario Generator', 'purple-team-scenario', 'Build a red+blue scenario with investigation layer', '{"target":"string"}', '{"scenario":"object"}', 'strict-strix,copilot-agent', '[{"action":"create_strix_scenario","tool_slug":"strict-strix"},{"action":"add_purple_layer","tool_slug":"copilot-agent"}]'),
('iMessage → Base44 → Copilot Relay', 'imessage-base44-copilot', 'Relay iMessage commands through Base44 to Copilot', '{"message":"string"}', '{"response":"string"}', 'imessage-bridge,base44,copilot-agent', '[{"action":"receive_imessage","tool_slug":"imessage-bridge"},{"action":"delegate_to_base44","tool_slug":"base44"},{"action":"fallback_to_copilot","tool_slug":"copilot-agent"}]'),
('Telegram Agent Orchestrator', 'telegram-orchestrator', 'Route Telegram agent messages to the right tool', '{"intent":"string"}', '{"routed_to":"string"}', 'telegram-bridge,copilot-agent', '[{"action":"parse_intent","tool_slug":"telegram-bridge"},{"action":"route_or_delegate","tool_slug":"copilot-agent"}]');

INSERT INTO workflows (name, slug, description, steps) VALUES
('Run STRIX + Purple Analysis', 'strix-purple-analysis', 'Run a STRIX blue-team scenario and overlay purple-team analysis', '[{"action":"create_strix_scenario","tool_slug":"strict-strix"},{"action":"add_purple_layer","skill_slug":"purple-team-scenario"}]'),
('Daily Agent Check-in', 'daily-agent-checkin', 'Ping all active agents and compile status', '[{"action":"ping_base44","tool_slug":"base44"},{"action":"ping_telegram","tool_slug":"telegram-bridge"},{"action":"summarize","tool_slug":"copilot-agent"}]');
