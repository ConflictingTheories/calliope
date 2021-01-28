# /*                                            *\
# ** ------------------------------------------ **
# **         Calliope - Site Generator   	    **
# ** ------------------------------------------ **
# **  Copyright (c) 2020 - Kyle Derby MacInnis  **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

FROM postgres

# Env Variables
ENV POSTGRES_USER=${DB_USER}
ENV POSTGRES_PASSWORD=${DB_PASS}
ENV POSTGRES_DB=${DB_NAME}

# Authorize DB Auth Access
# ADD ./scripts /docker-entrypoint-initdb.d

# Expose Ports
EXPOSE 5432
