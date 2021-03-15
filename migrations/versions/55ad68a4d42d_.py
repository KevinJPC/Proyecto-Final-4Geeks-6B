"""empty message

Revision ID: 55ad68a4d42d
Revises: 8da4fadf775e
Create Date: 2021-03-14 18:05:17.737873

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55ad68a4d42d'
down_revision = '8da4fadf775e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Favorite_restaurants',
    sa.Column('user_client_id', sa.Integer(), nullable=False),
    sa.Column('user_restaurant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_client_id'], ['User_client.id'], ),
    sa.ForeignKeyConstraint(['user_restaurant_id'], ['User_restaurant.id'], ),
    sa.PrimaryKeyConstraint('user_client_id', 'user_restaurant_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Favorite_restaurants')
    # ### end Alembic commands ###