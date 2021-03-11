"""empty message

Revision ID: 6ba4b5fe2607
Revises: cd54e9d2fb1c
Create Date: 2021-03-11 16:55:41.137097

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6ba4b5fe2607'
down_revision = 'cd54e9d2fb1c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('User_restaurant', sa.Column('image_url', sa.String(length=250), nullable=True))
    op.drop_column('User_restaurant', 'image_urll')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('User_restaurant', sa.Column('image_urll', sa.VARCHAR(length=250), autoincrement=False, nullable=True))
    op.drop_column('User_restaurant', 'image_url')
    # ### end Alembic commands ###