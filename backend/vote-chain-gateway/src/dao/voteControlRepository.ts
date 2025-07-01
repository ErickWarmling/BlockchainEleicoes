import pool from './db';

// Verifica se um CPF ja foi usado para votar
export async function hasVoted(cpfHashed: string): Promise<boolean> {
    const resultado = await pool.query('SELECT 1 FROM vote_control WHERE cpf_hashed = $1',[cpfHashed]);
    return (resultado.rowCount as number) > 0;
}

// Registra um CPF (hash) como votante
export async function  markAsVoted(cpfHashed: string, votedAt: number): Promise<void> {
    await pool.query(`INSERT INTO vote_control (cpf_hashed, voted_at) VALUES ($1, to_timestamp($2 / 1000.0))`, [cpfHashed, votedAt]);
}